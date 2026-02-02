"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { uploadImage } from "@/libs/api/uploadImage";
import BookIcon from "@/icons/book_icon.svg";
import toast from "react-hot-toast";

export default function ImageUploader({
  isPending,
  setIsPending,
  onUpload,
}: {
  isPending: boolean;
  setIsPending: (value: boolean) => void;
  onUpload: (menus: any[] | null) => void;
}) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadedImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const uploadingImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setIsPending(true);
    try {
      const res = await uploadImage(formData);
      const menus = res?.[0]?.output?.menus ?? null;
      if (menus.length === 0) {
        toast.error("메뉴판 이미지를 업로드해주세요 😅");
        setUploadedImage(null);
        setPreviewUrl(null);
        onUpload(null);
        return;
      }
      onUpload(menus);
    } catch (err) {
      toast.error("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("5MB 이하의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setUploadedImage(file);
    await uploadingImage(file);
    e.target.value = "";
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor="file-upload"
        className={`
          group relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer select-none
          bg-linear-to-b from-gray-50 to-gray-100
          border-3 border-neutral-300 hover:border-[#A3C76D] transition-all duration-200
          flex items-center justify-center
        `}
      >
        {/* 기본 상태 or 프리뷰 */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="업로드된 이미지 미리보기"
            className="object-cover w-full h-full transition-transform duration-200 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <BookIcon className="w-10 h-10 mb-2 opacity-80" />
            <span className="text-sm text-neutral-500">
              클릭하여 이미지 업로드
            </span>
            <span className="text-xs text-neutral-400">(최대 5MB)</span>
          </div>
        )}

        {/* 업로드 중 오버레이 */}
        {isPending && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-center">
            <div className="animate-spin border-4 border-gray-200 border-t-[#A3C76D] rounded-full w-10 h-10" />
            <p className="text-sm font-medium text-[#3b3b3b] animate-pulse">
              AI가 이미지를 통해 메뉴를 분석 중이에요 🍽️
            </p>
          </div>
        )}
      </label>

      {/* 삭제 버튼 */}
      {uploadedImage && !isPending && (
        <button
          type="button"
          className="absolute top-2 right-2 bg-black/40 text-white text-sm rounded-full px-2 py-1 hover:bg-black/60 transition-all cursor-pointer"
          onClick={() => {
            setUploadedImage(null);
            onUpload(null);
          }}
          aria-label="이미지 제거"
          title="이미지 제거"
        >
          ✕
        </button>
      )}

      <input
        hidden
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
