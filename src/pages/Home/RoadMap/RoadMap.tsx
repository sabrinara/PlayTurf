
import './RoadMap.css';

const RoadMap = () => {
 

  return (
    <div  className="my-10 md:mt-80">
    <h2 className="text-2xl md:text-4xl font-bold my-4 text-center text-[#42f5f5]">How It <span className="text-white">Works</span></h2>
    {/* <h5 className="text-base md:text-xl mt-6  mb-2 font-bold text-center">Our top selling products</h5> */}
    <hr className="border-2 border-[#42f5f5] w-5/12 md:w-1/12 mx-auto mb-2"/>
   
    <div className="home flex justify-center items-center px-10 md:px-0 text-center md:pl-40 md:py-0">
      
       
      <div className="process start ">
        <ul >
          <li className='one'>
            <div className="icon">
              <img src="./images/roadmap/1.png" alt="Process Icon" className=''/>
            </div>
            <div className="media-body w-full md:w-2/3">
              <h4>Step 1</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 1</p>
            </div>
          </li>
          <li className='two'>
            <div className="icon">
              <img src="./images/roadmap/2.png" alt="Process Icon" />
            </div>
            <div className="media-body w-full md:w-2/3">
              <h4>Step 2</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 2</p>
            </div>
          </li>
          <li className='three'>
            <div className="icon">
              <img src="./images/roadmap/3.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4>Step 3</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 3</p>
            </div>
          </li>
          <li className='four'>
            <div className="icon">
              <img src="./images/roadmap/4.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4>Step 4</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 4</p>
            </div>
          </li>
          <li className='five'>
            <div className="icon">
              <img src="./images/roadmap/5.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4 className='text-center'>Step 5</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 5</p>
            </div>
          </li>
       
        </ul>
      </div>
    </div>
    </div>
  );
};

export default RoadMap;
