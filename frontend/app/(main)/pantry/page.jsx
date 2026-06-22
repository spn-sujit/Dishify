"use client";
import {
  Check,
  ChefHat,
  Edit2,
  Inbox,
  Loader2,
  Package,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import AddToPantryModel from "../../../components/ui/AddToPantryModel";
import useFetch from "../../../hooks/use-fetch";
import {
  deletePantryItems,
  getPantryItems,
  updatePantryItems,
} from "../../../actions/pantryActions";
import PricingModel from "../../../components/ui/PricingModel";
import Link from "next/link";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";

const Pantrypage = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: "" });
  const [deletingId, setDeletingId] = useState(null);
  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems);
  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItems);
  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItems);
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    if (itemsData?.success) {
      setItems(itemsData.items);
    }
  }, [itemsData]);
  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success("Item removed from pantry");
      fetchItems();
    }
  }, [deleteData]);
  useEffect(() => {
    if (updateData?.success) {
      toast.success("Item updated successfully");
      cancelEdit();
      fetchItems();
    }
  }, [updateData]);
  const handleDelete = async (itemId) => {
    const formData = new FormData();
    setDeletingId(itemId);
    formData.append("itemId", itemId);
    await deleteItem(formData);
    setDeletingId(null);
  };
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("itemId", editingId);
    formData.append("name", editValues.name);
    formData.append("quantity", editValues.quantity);
    await updateItem(formData);
  };
  const startEdit = (item) => {
    setEditingId(item.documentId);
    setEditValues({
      name: item.name,
      quantity: item.quantity,
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", quantity: "" });
  };
  const handleModelSuccess = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-orange-50 pt-15 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-between gap-8 mb-6">
            <div className="flex items-center gap-6">
              <Package className="w-14 h-14 md:w-20 md:h-20 text-orange-600 shrink-0" />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-2">
                  My Pantry
                </h1>
                <p className="text-stone-600 font-light text-base md:text-lg tracking-wide">
                  Manage your ingredients and discover what you can cook
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsModelOpen(true)}
              size="lg"
              className="hidden md:flex items-center gap-2 h-11 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              Add to Pantry
            </Button>
          </div>
          {itemsData?.scansLimit !== undefined && (
            <div className="bg-stone-800 text-stone-100 py-3 px-5 rounded-xl inline-flex items-center gap-3 shadow-md border border-stone-800">
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
              <div className="text-sm">
                {itemsData.scansLimit === "unlimited" ? (
                  <p className="font-semibold tracking-tight">
                    Unlimited AI scans{" "}
                    <span className="text-orange-400 font-medium">
                      (Pro Plan)
                    </span>
                  </p>
                ) : (
                  <PricingModel>
                    <span className="text-stone-300 font-medium hover:text-orange-400 transition-colors cursor-pointer group tracking-tight">
                      Upgrade to{" "}
                      <span className="text-orange-500 font-bold group-hover:underline">
                        Pro
                      </span>{" "}
                      for unlimited Pantry scans
                    </span>
                  </PricingModel>
                )}
              </div>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <Link href="/pantry/recipes" className="block mb-8 group">
            <div className="bg-linear-to-br from-orange-500 to-amber-600 text-white p-6 border border-orange-600/30 hover:border-orange-500 shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-2xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-5 relative z-10">
                <div className="bg-white/20 p-3.5 border-2 border-white/30 group-hover:bg-white/30 transition-all duration-300 rounded-xl shrink-0">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl tracking-tight mb-1 flex items-center gap-2">
                    What Can I Cook Today?
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300 text-white/80">
                      →
                    </span>
                  </h3>
                  <p className="text-orange-50/90 text-sm font-normal">
                    Get AI-powered recipe suggestions from your{" "}
                    <span className="font-bold underline decoration-2 decoration-white/40">
                      {items.length}
                    </span>{" "}
                    Ingredients
                  </p>
                </div>
                <div className="shrink-0">
                  <Badge className="bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 text-xs font-semibold rounded-full shadow-xs group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                    {items.length} items
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        )}
        {loadingItems && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-stone-500 text-sm font-medium animate-pulse">
              Loading your pantry...
            </p>
          </div>
        )}
        {!loadingItems && items.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-5 mb-6">
              <h2 className="text-xl font-bold text-stone-800 tracking-tight">
                Your Ingredients
              </h2>
              <Badge className="bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-1 text-xs font-semibold rounded-md shadow-2xs">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.documentId}
                  className="group bg-stone-50/60 border border-stone-200/60 hover:border-orange-500/80 hover:bg-white p-5 rounded-xl transition-all duration-200 shadow-2xs hover:shadow-sm"
                >
                  {editingId === item.documentId ? (
                    <div className="space-y-3 w-full">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className="w-full bg-white border border-stone-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-3 py-1.5 text-sm font-medium text-stone-900 placeholder-stone-400 outline-hidden transition-all"
                        placeholder="Ingredient name"
                      />
                      <input
                        type="text"
                        value={editValues.quantity}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            quantity: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-stone-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-3 py-1.5 text-sm font-medium text-stone-900 placeholder-stone-400 outline-hidden transition-all"
                        placeholder="Quantity"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={updating}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 h-8 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 font-medium px-3 h-8 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <h3 className="font-bold text-stone-900 text-base group-hover:text-orange-600 transition-colors duration-200 truncate">
                            {item.name}
                          </h3>
                          <p className="text-stone-600 text-xs font-semibold bg-white border border-stone-200/60 px-2.5 py-0.5 rounded-md w-fit shadow-3xs">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            onClick={() => startEdit(item)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4 stroke-2" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                            onClick={() => handleDelete(item.documentId)}
                            disabled={deleting}
                          >
                            {deletingId === item.documentId ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 stroke-2" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="text-[11px] text-stone-400 font-medium border-t border-stone-200/40 pt-2 flex items-center gap-1">
                        <span>Added</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {!loadingItems && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 blur-2xl opacity-60 animate-pulse" />
              <div className="relative transition-transform duration-500 hover:scale-105 flex flex-col items-center">
                <Inbox className="w-12 h-12 text-orange-500 stroke-[1.5] animate-bounce" />
                <div className="w-10 h-2 bg-stone-300/80 rounded-full blur-xs mx-auto mt-2 shadow-lg shadow-stone-400/50" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-stone-800 tracking-tight mb-2">
              Your pantry is empty
            </h3>
            <p className="text-stone-400 text-sm max-w-xs font-normal leading-relaxed">
              Add some ingredients to get started.
            </p>
          </div>
        )}
      </div>
      <AddToPantryModel
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onSuccess={handleModelSuccess}
      />
    </div>
  );
};

export default Pantrypage;
