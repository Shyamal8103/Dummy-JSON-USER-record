import { Component } from "react";

export default class App extends Component{

  constructor(){
    super()
    this.state={
      user:[],
      skip:0,
      maleFemaleData : undefined,
      bgroup : undefined,
      
      ageD : undefined

    }
  
  }

  load(skip2){
    const url= 'https://dummyjson.com/users?limit=20&skip='+skip2
    fetch(url)
    .then(resp=>resp.json())
    .then(result=>
      { this.setState({user : result.users}
        )}
       )

      //  console.log(this.state.user)

  }

  componentDidMount(){
    this.load(this.state.skip)          
   
  }

  next=()=>{
    if(this.state.skip==95){
      alert('No More data Found')
    }else{
    let skip2= this.state.skip+20
    this.setState({skip : skip2})
    this.load(skip2)}
  }

  previous=()=>{
    if(this.state.skip==0){
      alert("No previous data")
    }else{
      let skip2=this.state.skip-20
    this.setState({skip: skip2})
    this.load(skip2)
    }
  }

  selectMF=()=>{
    let a = this.mfdata.value
    if(a=='All'){
      this.setState({maleFemaleData : undefined})
      // this.load(this.state.skip)
    }else{
    this.setState({maleFemaleData : a})
    // this.load(this.state.skip)
    }
   
   
  }

  changeb=()=>{
    let b=this.bloodg.value
    if(b==''){
      this.setState({bgroup : undefined})
    }else{
    this.setState({bgroup : b})
    console.log(b)}
  }

  changeAge=()=>{
    let rangeValue= this.rangeA.value
    // console.log(rangeValue)
    this.setState({ageD : rangeValue})
  }

  render(){
    let setarray = new Set(this.state.user.map(ob=>ob.bloodGroup))
    let newarray = Array.from(setarray)
    let smallerAge=this.state.user.map(ob=>ob.age).sort(this.a,this.b=this.a-this.b)[0]
    let elderAge=this.state.user.map(ob=>ob.age).sort(this.a,this.b=this.a-this.b)
    let a =elderAge[elderAge.length-1]
    // console.log(a)
    // console.log(agearr)
    return <div>
        <h1 className="alert-success text-center">API Request</h1>
        <div>
          <div className="row">
            <div className="col-lg-4">
              <select className="form-control" ref={ob=>this.mfdata=ob} onChange={this.selectMF}>
                <option>All</option>
                <option>male</option>
                <option>female</option>
              </select>
              </div>
            <div className="col-lg-4">
              <select className="form-control" ref={ob=>this.bloodg=ob} onChange={this.changeb}>
                <option value="">All Blood Group</option>
                {newarray.map(ob=><option>{ob}</option>)}
                
              </select>
            </div>
            <div className="col-lg-3 d-flex"><b className="">{smallerAge}</b><input ref={ob=>this.rangeA=ob} onChange={this.changeAge} type="range" className="form-control mx-3" min={smallerAge} max={a}/><b>{a}</b></div>
          </div>
          <div className="my-3">
          <button className="btn btn-success" onClick={this.previous}>Previous</button>&nbsp;&nbsp;
          <button className="btn btn-success" onClick={this.next}>Next</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <td>Img</td>
                <td>Name</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Email</td>
                <td>DOB</td>
                <td>Blood Group</td>
                <td>Address</td>
              </tr>
            </thead>
            <tbody>
              {this.state.user.filter(ob=>(this.state.maleFemaleData==undefined || this.state.maleFemaleData==ob.gender) && (this.state.bgroup==undefined || ob.bloodGroup==this.state.bgroup) && (this.state.ageD==undefined || this.state.ageD>=ob.age)).map(ob=><tr>
                <td><img src={ob.image} width={50} height={50} /></td>
                <td>{ob.firstName} {ob.lastName}</td>
                <td>{ob.age}</td>
                <td>{ob.gender}</td>
                <td>{ob.email}</td>
                <td>{ob.birthDate}</td>
                <td>{ob.bloodGroup}</td>
                <td>{ob.address.address}</td>
              </tr>)}
            </tbody>
          </table>
          
        </div>
      </div>
  }
}