import { useRouter } from 'next/router'
import UserView from './view/[tab]'

const DynamicPage = () => {
  const router = useRouter()
  const { id } = router.query

  // Eğer id varsa ve sayfa sunucu tarafında çalıştırılmıyorsa
  // konsola id'yi yaz
  if (id && typeof window !== 'undefined') {
    console.log('ID:', id)
  }

  return (
    <div>
      <UserView />
    </div>
  )
}

export default DynamicPage
