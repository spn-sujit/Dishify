import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Check, Loader2, Plus, X } from "lucide-react";
import useFetch from "../../hooks/use-fetch";
import {
  addPantryItemManually,
  saveToPantry,
  scanPantryImage,
} from "../../actions/pantryActions";
import { Button } from "./button";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import { Badge } from "./badge";
const AddToPantryModel = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScannedIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });
  const handleClose = () => {
    setActiveTab("scan");
    setSelectedImage(null);
    setScannedIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  };
  const {
    loading: scanning,
    data: scanData,
    fn: scanImage,
  } = useFetch(scanPantryImage);
  const {
    loading: saving,
    data: saveData,
    fn: saveScannedItems,
  } = useFetch(saveToPantry);
  const {
    loading: adding,
    data: addData,
    fn: addManualItem,
  } = useFetch(addPantryItemManually);
  const handleAddManual = async (e) => {
    e.preventDefault();
    if (!manualItem.name.trim() || !manualItem.quantity.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", manualItem.name);
    formData.append("quantity", manualItem.quantity);
    await addManualItem(formData);
  };
  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry!");
      setManualItem({ name: "", quantity: "" });
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [addData]);
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScannedIngredients([]);
  };
  useEffect(() => {
    if (scanData?.success && scanData?.ingredients.length) {
      setScannedIngredients(scanData.ingredients);
      toast.success(`Found ${scanData.ingredients.length} ingredients!`);
    }
  }, [scanData]);
  const handleScan = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);
    await scanImage(formData);
  };
  const handleSaveScanned = async () => {
    if (scannedIngredients.length === 0) {
      toast.error("No ingredients to save");
      return;
    }
    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(scannedIngredients));
    await saveScannedItems(formData);
  };
  useEffect(() => {
    if (saveData?.success) {
      toast.success(saveData.message);
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [saveData]);
  const removeIngredient = (index) => {
    setScannedIngredients(scannedIngredients.filter((_, i) => i !== index));
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={
          "max-w-3xl max-h-[900vh] bg-gray-50 overflow-y-auto rounded-2xl"
        }
      >
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-xl font-bold text-stone-900 tracking-tight">
            Add Items to Pantry
          </DialogTitle>
          <DialogDescription className="text-stone-500 text-sm font-normal">
            Add items manually or scan your pantry with AI.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className={"grid w-full grid-cols-2"}>
            <TabsTrigger value="scan">
              <Camera className="w-4 h-4" />
              AI Scan
            </TabsTrigger>
            <TabsTrigger value="manual">
              <Plus className="w-4 h-4" />
              Add Manually
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scan" className="outline-hidden">
            <div className="space-y-6">
              {scannedIngredients.length === 0 ? (
                <div className="space-y-4">
                  <ImageUploader
                    loading={scanning}
                    onImageSelect={handleImageSelect}
                  />
                  {selectedImage && !scanning && (
                    <Button
                      onClick={handleScan}
                      variant="primary"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-11 rounded-xl shadow-md shadow-orange-600/10 hover:shadow-lg hover:shadow-orange-600/15 transition-all cursor-pointer flex items-center justify-center gap-2"
                      disabled={scanning}
                    >
                      {scanning ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin stroke-[2.5]" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-5 h-5 stroke-2" />
                          <span>Scan Image</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="space-y-0.5">
                      <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                        Review Detected Items
                      </h3>
                      <p className="text-stone-500 text-sm font-normal">
                        Found {scannedIngredients.length}{" "}
                        {scannedIngredients.length === 1
                          ? "ingredient"
                          : "ingredients"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setScannedIngredients([]);
                        setSelectedImage(null);
                      }}
                      className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold h-9 px-3.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-stone-500 stroke-2" />
                      Scan Again
                    </Button>
                  </div>

                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {scannedIngredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between gap-4 bg-stone-50/60 border border-stone-200/60 p-3.5 rounded-xl transition-all duration-200 hover:border-orange-500/40 hover:bg-white hover:shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-bold text-stone-900 text-sm tracking-tight truncate">
                              {ingredient.name}
                            </span>
                            <span className="text-stone-500 text-xs font-semibold bg-white border border-stone-200/50 px-2 py-0.5 rounded-md w-fit shadow-3xs">
                              {ingredient.quantity || "1 unit"}
                            </span>
                          </div>

                          {ingredient.confidence && (
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0">
                              {Math.round(ingredient.confidence * 100)}% Match
                            </Badge>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                          className="h-8 w-8 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSaveScanned}
                    disabled={saving || scannedIngredients.length === 0}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/15 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:bg-emerald-600/50 disabled:text-white/80 disabled:shadow-none border border-transparent"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin stroke-[2.5]" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 stroke-[2.5]" />
                        <span>
                          Save{" "}
                          {scannedIngredients.length === 1 ? "Item" : "Items"}{" "}
                          to Pantry
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="manual" className="outline-hidden">
            <form onSubmit={handleAddManual} className="space-y-5 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-800 tracking-tight block">
                  Ingredients Name
                </label>
                <input
                  type="text"
                  value={manualItem.name}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, name: e.target.value })
                  }
                  placeholder="e.g., Chicken breast"
                  disabled={adding}
                  className="w-full bg-white border border-stone-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 placeholder-stone-400 outline-hidden transition-all disabled:bg-stone-50 disabled:text-stone-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-800 tracking-tight block">
                  Quantity
                </label>
                <input
                  type="text"
                  value={manualItem.quantity}
                  onChange={(e) =>
                    setManualItem({ ...manualItem, quantity: e.target.value })
                  }
                  placeholder="e.g., 500g, 2Cups, 3pieces"
                  disabled={adding}
                  className="w-full bg-white border border-stone-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-900 placeholder-stone-400 outline-hidden transition-all disabled:bg-stone-50 disabled:text-stone-400"
                />
              </div>
              <Button
                type="submit"
                disabled={adding}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-11 rounded-xl shadow-md shadow-orange-600/10 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:bg-orange-600/50"
              >
                {adding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Item</span>
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModel;
