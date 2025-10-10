import { Post } from "@/types/post";
import { PostDetail } from "@/types/postDetail";

function defaultImageForCategory(categoryId: number) {
  switch (categoryId) {
    case 1:
      return '/image/xedien.jpg';
    case 2:
      return '/image/xemaydien.jpg';
    case 3:
      return '/image/pin.jpg';
    default:
      return '/image/default.jpg';
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:8080/api/listing');
  if (!res.ok) throw new Error('Failed to fetch posts: ' + res.status);
  const listings = await res.json();

  // backend returns a Page object { content: [...], totalElements, ... } or an array
  const items = Array.isArray(listings) ? listings : (listings?.content ?? []);

  // Map backend Listing => Post (frontend Post type)
  return items.map((l: any) => {
    const categoryId = l.category?.categoryId || l.category?.categoryId || 0;
    const categoryName = (categoryId === 3) ? 'Pin Xe Điện' : 'Xe Điện';
    const image = (l.images && l.images.length > 0)
      ? l.images[0].url || l.images[0].path || '/image/default.jpg'
      : defaultImageForCategory(categoryId);

    return {
      id: l.listingId,
      title: l.title,
      category: categoryName as 'Xe Điện' | 'Pin Xe Điện',
      image,
      description: l.description || '',
      tags: [] as string[],
    } as Post;
  });
}

//Sủ dụng api swagger của backend cho tất cả bài viết




// export async function fetchPosts(): Promise<Post[]> {
//   const res = await fetch('http://localhost:8080/api/listing');
//   if (!res.ok) throw new Error('Failed to fetch posts');
//   return res.json();
// }

// //Sủ dụng api swagger của backend cho chi tiết bài viết
// export async function fetchPostById(id: number) {
//   const res = await fetch(`http://localhost:8080/api/listing/${id}`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Không thể tải chi tiết bài viết");
//   return res.json();
// }


export async function fetchPostById(listingId: string): Promise<PostDetail> {
  const res = await fetch(`http://localhost:8080/api/listing/${listingId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch post: ' + res.status);
  const l = await res.json();

  const categoryId = l.category?.categoryId || 0;
  const image = (l.images && l.images.length > 0)
    ? l.images[0].url || l.images[0].path || defaultImageForCategory(categoryId)
    : defaultImageForCategory(categoryId);

  return {
    listingId: l.listingId,
    seller: l.seller,
    category: l.category,
    title: l.title,
    description: l.description,
    brand: l.brand,
    warrantyInfo: l.warrantyInfo,
    model: l.model,
    year: l.year,
    seats: l.seats,
    vehicleType: l.vehicleType,
    color: l.color,
    mileage: l.mileage,
    batteryCapacity: l.batteryCapacity,
    capacity: l.capacity,
    voltage: l.voltage,
    cycleCount: l.cycleCount,
    batteryLifeRemaining: l.batteryLifeRemaining,
    price: l.price,
    contact: l.contact,
    status: l.status,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt,
    image,
    content: l.content || '',
  } as PostDetail;
}


//Lấy thông tin người dùng theo userId
export async function fetchUserById(userId: string) {
  const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Không thể tải thông tin người dùng");
  }

  return res.json();
}

