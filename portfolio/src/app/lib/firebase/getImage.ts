import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default function getImage(url: string) {
  const storage = getStorage();
  const imageref = ref(storage, url);

  getDownloadURL(imageref).then((url) => console.log(url));
}
