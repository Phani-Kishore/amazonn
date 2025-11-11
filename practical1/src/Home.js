import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';


function Home(){


    return(

      <div>
          <Navbar/>
          <div>
             This content
          </div>
             <Footer/>
      </div>
    )
}

export default Home