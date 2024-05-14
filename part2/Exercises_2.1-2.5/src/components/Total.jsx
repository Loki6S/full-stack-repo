const Total = ({parts}) =>{
    const res=parts.reduce((acc,curr) =>
      acc = acc+curr.exercises,0)
    return(
      <h4>
        total of {res} exercises
      </h4> 
    )
  }

export default  Total;