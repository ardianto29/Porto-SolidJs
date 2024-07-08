import { JSX } from "solid-js";
import { Button } from "./Button";

interface NotificationPopupProps {
  notification: string;
  closePopup: () => void;
}

export function NotificationPopup(props: NotificationPopupProps): JSX.Element {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <p class="text-lg font-semibold mb-4">{props.notification}</p>
        <Button type="button" variant="submit" onClick={props.closePopup}>
          Close
        </Button>
      </div>
    </div>
  );
}
