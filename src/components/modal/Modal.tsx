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
        <div className="w-full flex flex-col items-center gap-8">
          <DialogDescription className="w-5/6 max-w-[25rem] flex items-center justify-center font-semibold text-gray-700">
            <span className="inline-block truncate">{content}</span>
          </DialogDescription>
          <div className="w-full flex flex-row items-center justify-center gap-4">
            {actionButton}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
