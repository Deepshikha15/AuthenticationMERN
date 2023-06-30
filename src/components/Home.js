import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom';


export default function Home() {
    const location = useLocation();

  return (
    <div>
      <h3>Hello, welcome to the page</h3>
    </div>
  )
}
