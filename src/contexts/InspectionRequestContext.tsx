import { createContext, useContext, useState, ReactNode } from "react";

interface InspectionRequestContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const InspectionRequestContext = createContext<InspectionRequestContextType | undefined>(undefined);

export const InspectionRequestProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <InspectionRequestContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </InspectionRequestContext.Provider>
  );
};

export const useInspectionRequest = () => {
  const context = useContext(InspectionRequestContext);
  if (!context) {
    throw new Error("useInspectionRequest must be used within an InspectionRequestProvider");
  }
  return context;
};
