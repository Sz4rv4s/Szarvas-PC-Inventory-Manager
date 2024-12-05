export interface PartWithWarehouse {
    id: number;
    model: string;
    brand: string;
    price: number;
    warehouseId: WarehouseForPart;
}

export interface WarehouseForPart {
    id: number;
    name: string;
    city: string;
    address: string;
    capacity: number;
}

export interface PartForWarehouse {
    id: number;
    model: string;
    brand: string;
    price: number;
}

export interface WarehouseWithParts {
    id: number;
    name: string;
    city: string;
    address: string;
    capacity: number;
    parts: PartForWarehouse[];
}

export interface PartForUpdate {
  id: number;
  model: string;
  brand: string;
  price: number;
  warehouseId: number;
}

export interface SearchPartProps {
  onPartFound: (part: PartForWarehouse | null | PartForWarehouse[]) => void;
  onClear: () => void;
}

export interface PartsPanelProps {
  onPartFound: (part: PartForWarehouse | null | PartForWarehouse[]) => void;
  onClear: () => void;
  partsDataLength: number;
  refetchParts: () => void;
}

export interface ModalProps {
    message: string | null;
    onClose: () => void;
}

export interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultId: number;
  refetchParts: () => void;
}

export interface DeleteButtonProps {
  partId: number;
  refetchParts: () => void;
}

export interface UpdatePriceButtonProps {
  partId: number;
  oldPrice: number;
  refetchParts: () => void;
}

export interface UpdatePartButtonProps {
  oldData: PartForUpdate;
  refetchParts: () => void;
}

export type UserRegistrationData = {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "ROLE_ADMIN" | "ROLE_USER";
}

export type UserLoginData = {
  username: string;
  password: string;
}

export interface AuthContextTypes {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  jwt: string | null;
  setJwt: (value: string | null) => void;
  username: string | null;
  setUsername: (value: string | null) => void;
  role: string | null;
  setRole: (value: string | null) => void;
}

export interface DecodedToken {
  role: string;
}
