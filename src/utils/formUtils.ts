import { handleSubmit } from "../utils/formSubmit";

export const handleFormUtils = (
  event: Event,
  setNotification: (notification: string) => void,
  setShowPopup: (show: boolean) => void
) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  handleSubmit(form)
    .then((response) => {
      if (response.ok) {
        setNotification("Pesan Anda berhasil terkirim!");
      } else {
        setNotification("Maaf, terjadi kesalahan. Silakan coba lagi.");
      }
      setShowPopup(true);
      form.reset();
    })
    .catch(() => {
      setNotification("Maaf, terjadi kesalahan. Silakan coba lagi.");
      setShowPopup(true);
    });
};
