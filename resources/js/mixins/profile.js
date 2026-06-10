export function normalizeProfilePicture(user) {
  if (!user || !user.profile_picture) return user

  const pic = String(user.profile_picture)
  // leave full URLs as-is
  if (pic.startsWith('http')) return user

  // if returned path is relative like 'profile_pictures/x.jpg'
  if (!pic.startsWith('/')) {
    user.profile_picture = `/storage/${pic}`
    return user
  }

  // if starts with '/' but not '/storage/', ensure it points to /storage/
  if (!pic.startsWith('/storage/')) {
    user.profile_picture = `/storage/${pic.replace(/^\//, '')}`
    return user
  }

  return user
}
