import { Banner1, Banner2, Banner3 } from "layouts/Customer/Header/Banner";
import { Service } from "layouts/Customer/Home/Service";
import { FeaturedProduct } from "layouts/Customer/Home/FeaturedProduct";

export default function Home() {
  return (
    <div className="home-container">
      <Banner1 />
      <Service />
      <Banner2 />
      <FeaturedProduct />
      <Banner3 />
    </div>
  );
}
