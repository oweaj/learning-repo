import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  content?: string;
  trigger: React.ReactNode;
  actionButton: React.ReactNode;
}
const Modal = ({
  isOpen,
  setIsOpen,
  content,
  trigger,
  actionButton,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn("w-[25rem] h-auto min-h-40 rounded-lg overflow-hidden")}
      >
        <DialogTitle className="sr-only" />
        <DialogDescription className="flex items-center justify-center text-base font-semibold text-gray-700">
          {content}
        </DialogDescription>
        <div className="flex flex-row items-center justify-center gap-4">
          {actionButton}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
