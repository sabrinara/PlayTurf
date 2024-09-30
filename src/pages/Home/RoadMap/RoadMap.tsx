
import './RoadMap.css';

const RoadMap = () => {
 

  return (
    <div className="home flex justify-center items-center px-10 md:px-0 text-center md:pl-40 md:py-28">
      <div className="process start ">
        <ul >
          <li className='one'>
            <div className="icon">
              <img src="images/flat-icon/1-01.png" alt="Process Icon" />
            </div>
            <div className="media-body w-full md:w-2/3">
              <h4>Step 1</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 1</p>
            </div>
          </li>
          <li className='two'>
            <div >
              <img src="images/flat-icon/5-01.png" alt="Process Icon" />
            </div>
            <div className="media-body w-full md:w-2/3">
              <h4>Step 2</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 2</p>
            </div>
          </li>
          <li className='three'>
            <div className="">
              <img src="images/flat-icon/6-01.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4>Step 3</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 3</p>
            </div>
          </li>
          <li className='four'>
            <div >
              <img src="images/flat-icon/8-01.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4>Step 4</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 4</p>
            </div>
          </li>
          <li className='five'>
            <div >
              <img src="./images/flat-icon/9-01.png" alt="Process Icon" />
            </div>
            <div className="media-body  w-full md:w-2/3">
              <h4 className='text-center'>Step 5</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sequi nihil soluta sed quis ullam eius nesciunt natus veritatis! Quos accusamus molestias unde dicta quod eaque praesentium labore, explicabo quam. 5</p>
            </div>
          </li>
       
        </ul>
      </div>
    </div>
  );
};

export default RoadMap;
