export interface Post {
  id: string;
  title: string;
  category: 'Xe Điện' | 'Pin Xe Điện';
  image: string;
  description: string;
  tags: string[];
}
