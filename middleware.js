import jwt from 'jsonwebtoken'

export default function middleware(req, res, next) {
  const token = req.headers.authorization

  // Checking if there is an auth header
  if (!token) {
    res.status(401).json({ message: 'Unauthorized', reason: 'No token found' })
  } else
    try {
      // Decoding info from the token (payload)
      const payload = jwt.verify(token, process.env.SECRET_KEY)
      req.user = payload.user
    } catch (err) {
      // If something went wrong (possible bad secret key)
      res.status(400).json({ error: 'Bad request' })
      console.log(err)
    }

  // Get out of the middleware and continue
  next()
}
