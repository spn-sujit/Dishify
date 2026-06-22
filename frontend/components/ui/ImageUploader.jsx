"use client";
import { Camera, ImageIcon, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import Image from "next/image";
import { RingLoader } from "react-spinners";

export default function ImageUploader({ loading, onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    },
    [onImageSelect],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    maxSize: 10485760,
    noClick: true,
    noKeyboard: true,
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onDrop([file]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (preview) {
    return (
      // Changed background to bg-stone-900 for a better gallery look
      // Changed object-cover to object-contain so the full image fits
      <div className="relative w-full aspect-video bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 shadow-inner flex items-center justify-center">
        <Image
          src={preview}
          alt="Pantry preview"
          fill
          className="object-contain p-2"
        />
        {!loading && (
          <button
            onClick={clearImage}
            className="absolute top-3 right-3 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 rounded-full shadow-md hover:shadow-lg transition-all text-white border border-white/20 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
        {loading && (
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 animate-fade-in">
            <RingLoader color="#ea580c" size={50} />
            <span className="text-white text-xs font-semibold tracking-wide">AI Analysing Ingredients...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative w-full aspect-square border-2 border-dashed rounded-2xl transition-all duration-200 outline-hidden
          ${isDragActive 
            ? "border-orange-500 bg-orange-50/50 scale-[1.01]" 
            : "border-stone-200 bg-stone-50/60 hover:border-orange-400 hover:bg-orange-50/30"
          }`}
      >
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
          <div
            className={`p-4 rounded-full transition-all duration-200 shadow-2xs ${
              isDragActive 
                ? "bg-orange-600 scale-110 shadow-orange-600/20" 
                : "bg-orange-50 border border-orange-100/80"
            }`}
          >
            {isDragActive ? (
              <ImageIcon className="w-7 h-7 text-white" />
            ) : (
              <Camera className="w-7 h-7 text-orange-600 stroke-2" />
            )}
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              {isDragActive ? "Drop your image here" : "Scan Your Pantry"}
            </h3>
            <p className="text-stone-500 text-sm max-w-xs font-normal leading-relaxed">
              {isDragActive
                ? "Release to upload"
                : "Take a photo or drag & drop an image of your fridge or pantry."}
            </p>
          </div>

          {!isDragActive && (
            <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs justify-center pt-1">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-10 px-4 rounded-xl shadow-sm shadow-orange-600/10 transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Camera className="w-4 h-4 stroke-2" />
                Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }}
                className="bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold h-10 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Upload className="w-4 h-4 text-stone-500 stroke-2" />
                Browse Files
              </Button>
            </div>
          )}
          
          <p className="text-xs text-stone-400 font-medium tracking-wide">
            Supports JPG, PNG, WebP • Max 10MB
          </p>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
}