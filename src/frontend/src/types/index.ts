// 基礎型別定義
export interface User {
  id: string;
  email: string;
  name: string;
  type: 'creator' | 'client';
  avatar?: string;
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  bio?: string;
  skills?: string[];
  portfolio?: string[];
  rating?: number;
  reviewCount?: number;
  location?: string;
  languages?: Language[];
}

export interface Language {
  code: string;
  name: string;
  level: 'native' | 'fluent' | 'conversational' | 'basic';
}

// 服務相關型別
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  creatorId: string;
  creator?: User;
  category: ServiceCategory;
  subcategory?: string;
  images: string[];
  tags: string[];
  deliveryTime: number; // 天數
  revisions: number;
  status: 'active' | 'paused' | 'draft';
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

// 訂單相關型別
export interface Order {
  id: string;
  serviceId: string;
  service?: Service;
  clientId: string;
  client?: User;
  creatorId: string;
  creator?: User;
  status: OrderStatus;
  amount: number;
  currency: string;
  description: string;
  requirements?: string;
  deliverables?: string[];
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'in_progress' 
  | 'delivered' 
  | 'revision_requested' 
  | 'completed' 
  | 'cancelled';

// 作品集型別
export interface Portfolio {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creator?: User;
  category: string;
  tags: string[];
  images: string[];
  videos?: string[];
  projectUrl?: string;
  technologies?: string[];
  completionDate: Date;
  createdAt: Date;
}

// API回應型別
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 搜尋和篩選型別
export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  deliveryTime?: number;
  rating?: number;
  location?: string;
  tags?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  sort?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}
