import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl: string;
}

const ProjectModal = ({ isOpen, onClose, projectTitle, projectUrl }: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[85vh] p-0">
        <div className="w-full h-full px-6 pt-6 pb-6">
          <iframe
            src={projectUrl}
            className="w-full h-full rounded-lg border border-border"
            title={projectTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
