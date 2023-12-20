import { storage } from "@/lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { useState } from "react";
import { FileType } from "../data/schema";

export default function useFetchFirebase() {
  const imageListRef = ref(storage, "materials/");
  const [imageList, setImageList] = useState<any[]>([]);

  const fetchImages = async () => {
    const imageListRef = ref(storage, "materials/");
    const res = await listAll(imageListRef);
    const imageList = await Promise.all(
      res.items.map(async (item) => {
        const metadata = await getMetadata(item);
        const downloadURL = await getDownloadURL(item);
        return {
          name: metadata.name,
          url: downloadURL,
          type: metadata.contentType,
        };
      })
    );
    return imageList as FileType[];
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`file-storage`],
    queryFn: fetchImages,
  });

  return { data, isLoading, refetch };
}
