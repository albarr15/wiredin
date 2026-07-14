import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(process.env.SUPABASE_URL);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  req.user = user;
  next();
};

export default authenticateUser;
