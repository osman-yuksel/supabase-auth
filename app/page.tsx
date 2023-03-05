import { createClient } from "../utils/supabase-server";

export default async function ServerComponent() {
  const supabase = createClient();
  const { data } = await supabase.from("Messages").select("*");

  if (data?.length === 0) {
    return <p>Only authenticated users can see messages</p>;
  }

  return <pre>{JSON.stringify({ data }, null, 2)}</pre>;
}
