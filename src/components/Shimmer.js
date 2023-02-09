const Shimmer  = () =>{
    return (
       <>
       <div className="restaurant_list">


        {Array(5)
           .fill(" ")
           .map((e, index) => (
           <div className="shimmer_card" key={index}></div>
           ))}

           
       </div>
       
       </>
    );
};

export default Shimmer