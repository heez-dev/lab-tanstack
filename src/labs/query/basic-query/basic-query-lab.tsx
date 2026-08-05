import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
}

interface PostsObserverProps {
  label: string;
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return response.json();
}

function PostsObserver({ label }: PostsObserverProps) {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // isPending: 아직 성공 데이터가 없는 status
  // isLoading: isPending && isFetching
  if (postsQuery.isPending) {
    return <div>{label}: 게시글을 불러오는 중...</div>;
  }

  if (postsQuery.isError) {
    return <div>{label}: 게시글을 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-accent">{label} 목록</h1>
      <ul>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function BasicQueryLab() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-4 text-2xl font-bold">Basic Query</h1>
      <PostsObserver label="Observer A" />
      <PostsObserver label="Observer B" />
    </div>
  );
}
