import africanAmerican from "../assets/images/african-american-man-woman-talking-girl-hospital-ward-about-healing-treatment-diagnosis-doctors-examining-sick-young-patient-with-cervical-neck-collar-sitting-bed 2.png";
import peopleTakingCare from "../assets/images/people-taking-care-together-donations 4.png";
import gavelWithBook from "../assets/images/gavel-with-books-old-wooden-desk 3.png";

type ServicesProps = {
  title: string;
  optionalHeader?: string;
  LeftAlign?: string;
};

const Services = ({ title, optionalHeader, LeftAlign }: ServicesProps) => {
  return (
    <section className="px-[5%] mb-20 ">
      <h2 className={`text-base text-gold ${LeftAlign}`}>{optionalHeader}</h2>
      <h2 className={`text-2xl font-bold mb-7 ${LeftAlign}`}>Our Goals</h2>
      <div className="grid md:grid-cols-2 lg:flex justify-center md:justify-between md:space-x-10  space-y-10 lg:space-y-0 ">
        <div className="service-card  ">
          <img src={africanAmerican} alt="african american" />
          <div className="p-5 text-sm">
            <h3 className="text-[#F59134] font-semibold text-xl mb-5">
              Lift Nigerians from proverty
            </h3>
            <h3 className="font-semibold text-lg mb-5">
              Support groups and referral
            </h3>
            <p className="mb-5">
              Take time out to view tips on how to be your own security and
              safty personel in our absence{" "}
            </p>
            <p>
              Take time out to view tips on how to be your own security and
              safty personel in our absence
            </p>
            <button className="mt-6 flex items-center space-x-4 rounded-md px-10 py-3 bg-[coral]/80 text-white">
              <span>Get Supported</span>
            </button>
          </div>
        </div>
        <div className="service-card  ">
          <img src={peopleTakingCare} alt="people taking care together" />
          <div className="p-5 text-sm">
            <h3 className="text-[#F59134] font-semibold text-xl mb-5">
              Return dropouts back to school
            </h3>
            <h3 className="font-semibold text-lg mb-5">
              Support Groups and Referals
            </h3>
            <p className="mb-5">
              Take time out to view tips on how to be your own security and
              safty personel in our absence{" "}
            </p>
            <p>
              Take time out to view tips on how to be your own security and
              safty personel in our absence
            </p>
            <button className="mt-6 flex items-center space-x-4 rounded-md px-10 py-3 bg-[coral]/80 text-white">
              <span>Contact Us</span>
            </button>
          </div>
        </div>
        <div className="service-card !ml-0 md:!ml-10 ">
          <img src={gavelWithBook} alt="image3" />
          <div className="p-5 text-sm">
            <h3 className="text-[#F59134] font-semibold text-xl mb-5">
              Make you a breadwinner{" "}
            </h3>
            <h3 className="font-semibold text-lg mb-5">
              We Offer You All Legal Services
            </h3>
            <p className="mb-5">
              Take time out to view tips on how to be your own security and
              safty personel in our absence{" "}
            </p>
            <p>
              Take time out to view tips on how to be your own security and
              safty personel in our absence
            </p>
            <button className="mt-6 flex items-center space-x-4 rounded-md px-10 py-3 bg-[coral]/80 text-white">
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
