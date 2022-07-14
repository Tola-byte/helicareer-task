import React , {useState , useEffect} from 'react'
import { useQuery , gql } from "@apollo/client";
//import Search from './Search';


const GET_QUERY = gql `
query {
    info{
        id
        status
        date
        type
    }
}

`



function Dataconsume() {
    const {loading , error, data} = useQuery(GET_QUERY);

    // we filtering by status and type, so we create a state management for them
    const [ filterByType , setfilterByType ] = useState("");
    const [ filterByStatus , setfilterByStatus] = useState("");
    //our outcome after filtering will yield an array of data, so we create a state management for that too.
    const [ outcome , setOutcome ] = useState([]);
    const [ search , setSearch ] = useState("");

    


    const DateVisible = ({date,data})=> {
        return (
            <div className='flex justify-center flex-col w-full'>
        
        
        <p className='text-black font-extrabold my-5 h-16 w-1/2 py-5 bg-slate-300 mx-auto rounded-xl'> Date : {date}</p>
        { data?.map((ansa , ids) => (
            <div className='flex flex-column bg-slate-600 shadow-lg justify-center my-10 h-36 w-1/2 mx-auto rounded-lg text-white font-semibold'>
            <div className='flex flex-row gap-20 my-7' key={ids}>
            <p>id: {ansa.id}</p>
          <div className='px-10 pb-5'>
           
           { ansa.status === "success" ? 
          <p>status : {ansa.status} &#9989;</p>
          :
          <p>status : {ansa.status}&#9940;</p>
          }
          {
            ansa.type === "credit"?
            <p>type: {ansa.type}&#128513;</p>
            :
            <p>type: {ansa.type} &#128528;</p>
          }
          
         </div>
          </div>
        </div>
        ))}
      
        </div>
        
        )
    }
    useEffect(()=> {
        if(data){
            const transactions = data.info
            .filter((item) => {
              return Object.keys(item).some((key) => {
                return key === "name"
                  ? false
                  : item[key]
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase().trim());
              });
            })
            .filter((item) =>{
               if ( filterByStatus && filterByType){
                    return item.type === filterByType && item.status === filterByStatus;
                } 
                else if(filterByStatus){
                  return item.status === filterByStatus;
                }
                else if (filterByType){
                  return item.type === filterByType;
                }
                else return item;
            })
        
            .reduce((transactions , dame)=> {
                const date = dame.date;
                if (!transactions[date]) {
                  transactions[date] = [];
                }
                transactions[date].push(dame);
                return transactions;
              }, {});
            

              const transactionArrays = Object.keys(transactions).map((date) => {
                return {
                  date,
                  dame: transactions[date],
                };
              });
              setOutcome(transactionArrays);
        }
          }, [filterByStatus , filterByType , search, data]);
          console.log(outcome);
    
    if(loading){
        return <h2> Loading... please wait <span> &#128512;</span></h2>
    }
    if(error){
        return <h2>Oopss... can't reach out to the server right now, try again . </h2>
    }
  return (
    <div>
    <div> 
    <input type="text" className='w-1/2 h-20 my-7 border-solid border-2 p-8 placeholder:italic placeholder:text-slate-400 focus: border-slate-500'
    placeholder='Enter name of transaction here ...'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    />
   

    <h5 className='text-black font-bold mb-5'>The details are :</h5>
    <div className='flex flex-row justify-center gap-10'> 
    <p className='w-55 h-26 bg-slate-600 py-5 px-5 text-white font-semibold rounded-lg mb-5'
    value={filterByStatus}
    onClick={(e)=> setfilterByStatus(e.target.value)}

    
    >
    
    
    Filter by status
    <div className='flex gap-5'>
    <p>
    <input type = "radio" value="success" id="success" name = "status"/> success &#9989;
    </p>
    <p>
    <input type="radio" value="declined" id="declined" name = "status"/> declined &#9940;
    </p>
    </div>
    </p>
    <p  className='w-55 h-26 mb-5 bg-slate-600 py-5 px-5  text-white font-semibold  rounded-lg' 
    value={filterByType}
    onClick={(e)=> setfilterByType(e.target.value)}
  
    
    >
    
    Filter by Type
    <div className='flex gap-5'>
    <p>
    <input type = "radio" value="credit" id="credit" name = "type"/> credit &#128513;
    </p>
    <p>
    <input type="radio" value="debit" id="debit" name = "type"/> debit &#128528;
    </p>
    </div>
    </p>
   
    </div>


    
    { outcome?.length === ""   ?
      (
      <p>No items found in such category...</p> 
      )
    
        :
        (
        outcome.map((ansa , ids) => (
      <div key={ids}>
     <DateVisible date = {ansa?.date} data={ansa?.dame} key={ids} />
     </div>
        )
       
      
    ))} 
    </div>
    </div>
  )
}



export default Dataconsume