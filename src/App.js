import Layout from "./Components/Layout/Layout"
import BurgerBuider from "./Container/BurgurBuilder/BurgerBuilder"
import Checkout from "./Container/Checkout/Checkout"
function App() {
  return (
    <div>
      <Layout>
        <BurgerBuider></BurgerBuider>
        <Checkout></Checkout>
      </Layout>
    </div>
  );
}

export default App;
