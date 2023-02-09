
// import restaurantList from "./restaurantList"
import {useEffect, useState} from "react"
import Shimmer from "./Shimmer"




const Restrauntcard = ({
    name,
    cuisines, 
    cloudinaryImageId, 
    lastMileTravelString,
    address,

}) => {

       return(
          <>
        
        <div className="card">
              <img
          src={
            "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + cloudinaryImageId}
          
        ></img>
            <h2> {name}</h2>
            <h3> {cuisines.join(", ")}</h3>
            <h4>{lastMileTravelString}</h4>
            <h6>{address}</h6>
           
        </div>
     </>
    )
}



function filterdata(scarchBox,restaurants){

    const filterdata = restaurants.filter((restaurant)=>

    restaurant.data.name.toLowerCase().includes(scarchBox.toLowerCase())
    )
    return filterdata;   

}


const Body = () => {

    // const [restaurants, setrestaurant] = useState(restaurantList);

    const [Filerrestaurants, setFilerrestaurants] = useState([]);
    const [Allrestaurants, setAllrestaurant] = useState([]);

    const [scarchBox, setScarchBox] = useState("");

    useEffect(()=>{
        getRestaurants()
    },[])

  async function getRestaurants(){
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.159771&lng=77.626189&page_type=DESKTOP_WEB_LISTING')
    const json = await data.json();
    console.log(json);
    setAllrestaurant(json?.data?.cards[2]?.data?.data?.cards)
    setFilerrestaurants(json?.data?.cards[2]?.data?.data?.cards)
}
  
    return Allrestaurants.length==0 ? (
    <Shimmer/> ):
    (

        <>
       <div className="search-container">
       <input type="search"  
        placeholder="scarch.."
        value={scarchBox}
       onChange={ (e)=> setScarchBox(e.target.value)}
        ></input>

        <button className="scarch-btn"

         
        onClick={()=>{
                 
            const data = filterdata(scarchBox , Allrestaurants);
            setFilerrestaurants(data);
            }}>  search </button>

        
       </div>
        <div className="list">
        {
            Filerrestaurants.map((restaurant)=>{
                return <Restrauntcard {...restaurant.data} key={restaurant.data.id}/>
            })      
        }
        </div>
        </>
    )
}

export default Body










// const CardList = ({name}) =>{
//     return(
//         <>
//         <h1>{name}</h1>
//         </>
//     )
// }

// const Body = () => {

//     const [restaurant, setrestaurant] = useState(restaurantList)

//   return (
//         <>
        
//         <div className="card">

//         {restaurant.map((cardList)=>{
//             return <CardList {...cardList.data} key={cardList.data.id}/>
//         })}

//         </div>
//         </>
//   )
// }
