import { Post } from "@/types/post";

export async function fetchPosts(): Promise<Post[]> {
  return [
    {
      id: '1',
      title: 'Tesla Model Y - Xe điện SUV hàng đầu thế giới',
      category: 'Xe Điện',
      image: '/image/tesla.jpg',
      description: 'Đánh giá chi tiết Tesla Model Y với thiết kế hiện đại, công nghệ tự lái tiên tiến và hiệu suất vượt trội.',
      tags: ['Tesla', 'SUV', 'Tự lái']
    },
    {
      id: '2',
      title: 'Pin thể rắn - Tương lai xe điện',
      category: 'Pin Xe Điện',
      image: '/image/solid-state.jpg',
      description: 'Công nghệ pin thể rắn đang cách mạng hóa ngành công nghiệp xe điện với hiệu suất cao và an toàn hơn.',
      tags: ['Pin', 'Công nghệ']
    },
    {
      id: '3',
      title: 'VinFast VF8 - Xe điện Việt Nam chinh phục thế giới',
      category: 'Xe Điện',
      image: '/image/vinfast-vf8.jpg',
      description: 'VinFast VF8 với thiết kế độc đáo và công nghệ thông minh, mở rộng ra thị trường quốc tế.',
      tags: ['VinFast', 'Công nghệ', 'Việt Nam']
    },
    {
      id: '4',
      title: 'BMW iX - SUV điện với công nghệ tương lai',
      category: 'Xe Điện',
      image: '/image/bmw-ix.jpg',
      description: 'BMW iX mang đến trải nghiệm cao cấp với nội thất sang trọng và công nghệ AI tiên tiến.',
      tags: ['BMW', 'Luxury', 'AI']
    },
    {
      id: '5',
      title: 'Công nghệ pin Lithium-silicon: Đột phá mới',
      category: 'Pin Xe Điện',
      image: '/image/lithium-silicon.jpg',
      description: 'Pin lithium-silicon mang lại mật độ năng lượng cao hơn và thời gian sạc nhanh hơn.',
      tags: ['Pin', 'Lithium', 'Đột phá']
    },
    {
      id: '6',
      title: 'Kia EV6 - Mẫu xe điện thể thao đa dụng',
      category: 'Xe Điện',
      image: '/image/kia-ev6.jpg',
      description: 'Kia EV6 nổi bật với thiết kế thể thao, hiệu suất mạnh mẽ và hỗ trợ sạc siêu nhanh.',
      tags: ['Kia', 'EV', 'Sạc nhanh']
    },
    {
      id: '7',
      title: 'Tái chế pin xe điện: Giải pháp bền vững',
      category: 'Pin Xe Điện',
      image: '/image/recycle-battery.jpg',
      description: 'Tái chế pin giúp giảm tác động môi trường và tiết kiệm tài nguyên quý giá.',
      tags: ['Pin', 'Tái chế', 'Môi trường']
    },
    {
      id: '8',
      title: 'Pin Graphene: Bước tiến trong lưu trữ năng lượng',
      category: 'Pin Xe Điện',
      image: '/image/graphene-battery.jpg',
      description: 'Pin graphene được kỳ vọng sẽ thay đổi toàn bộ ngành công nghiệp lưu trữ năng lượng.',
      tags: ['Pin', 'Graphene', 'Tương lai']
    },
    {
      id: '9',
      title: 'Hyundai IONIQ 5 - Mẫu xe điện gia đình thông minh',
      category: 'Xe Điện',
      image: '/image/ioniq5.jpg',
      description: 'Hyundai IONIQ 5 cung cấp không gian rộng rãi, công nghệ kết nối và hệ thống sạc linh hoạt.',
      tags: ['Hyundai', 'Gia đình', 'Công nghệ']
    }
  ];
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


export async function fetchPostById(listingId: string) {
  // Giả lập gọi API (có thể thêm delay để giống thật)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const now = new Date().toISOString();

  return {
    listingId: listingId || "LST-001",
    seller: {
      userID: "U001",
      userName: "Nguyen Van A",
      userEmail: "a@example.com",
      dob: now,
      role: { roleId: 1, roleName: "Seller" },
      phone: "0912345678",
      subid: {
        subId: 1,
        subName: "Premium Plan",
        subDetails: "Đăng nhiều sản phẩm hơn",
        subPrice: "500000",
        duration: 30,
        priorityLevel: 2,
        status: "ACTIVE",
      },
      userStatus: "ACTIVE",
    },
    category: { categoryId: 1, categoryName: "Xe hơi điện" },
    title: "Tesla Model Y - SUV điện hàng đầu",
    description:
      "Tesla Model Y sở hữu thiết kế sang trọng, hiệu năng cao và công nghệ tự lái tiên tiến.",
    brand: "Tesla",
    warrantyInfo: "3 năm hoặc 100.000 km",
    model: "Model Y",
    year: 2024,
    seats: 5,
    vehicleType: "SUV",
    color: "Trắng",
    mileage: "5,000 km",
    batteryCapacity: "75 kWh",
    capacity: "",
    voltage: "",
    cycleCount: 0,
    batteryLifeRemaining: "",
    price: 1500000000,
    contract: "Standard Contract",
    status: "PENDING",
    createdAt: now,
    updatedAt: now,
    image: "/image/tesla.jpg",
    content: `<p>Tesla Model Y là một trong những mẫu SUV điện được ưa chuộng nhất hiện nay. Với thiết kế hiện đại, nội thất rộng rãi và công nghệ tiên tiến, Model Y mang đến trải nghiệm lái xe tuyệt vời.</p>`,
  };
}



