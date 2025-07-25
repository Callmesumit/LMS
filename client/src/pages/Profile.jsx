import React, { useState } from "react";
import UserLogo from "../assets/img2.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function Profile() {
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth)
  const [input, setInput] = useState({
    name:user?.name,
    description: user?.description,
    file:user?.photoUrl
  })

  const [loading, setLoading] = useState(false)
  const [open , setOpen] = useState(false)

  const changeEventHandler = (e) =>{
    const {name, value} = e.target;
    setInput((prev) => ({
      ...prev,
      [name]:value,
    }))
  }

  const changeFileHandler =(e)=>{
    setInput({...input,file:e.target.files?.[0]})
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    if (input?.file) {
      formData.append("file",input?.file)
    }
    try {
      setLoading(true)
      const res = await axios.put("http://localhost:8000/api/v1/user/profile/update",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,

      })
      if (res.data.success) {
        setOpen(false)
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error);
      
    }finally {
      setLoading(false)
    }
    
  }


  return (
    <div className=" bg-gray-100 py-12 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* profile Piciture */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img src={ user?.photoUrl || UserLogo} className="w-full h-full object-cover" />
          </div>

          {/* user_info */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-500">Welcome, {user?.name|| "User"}</h1>
            <p className="text-lg text-gray-600 mt-3">
              <span className="font-bold">Email :</span> {user?.email || "Email not Available"}
            </p>
            <p className="text-gray-600 my-1 capitalize">
              <span className="font-bold"> Role: </span>{user?.role}
            </p>
            <p className="text-gray-700 text-base leading-relaxed mb-3">
              <span className="font-bold">Bio: </span> {user?.description ||  "Add Your Bio"}
              
            </p>

            <Dialog open={open} onOpenChange={setOpen} >
              
                <Button onClick={()=>setOpen(true)} className="bg-blue-500">Edit Profile</Button>
              
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Make Changes to your Profile hear.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 item-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 item-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="name"
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div><div className="grid grid-cols-4 item-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Picture
                    </Label>
                    <Input
                      id="file"
                      type='file'
                      accept="image\*"
                      onChange={changeFileHandler}
                      className="w-[277px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {
                    loading ? <Button className='bg-blue-400' ><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait</Button>: <Button onClick={submitHandler} className='bg-blue-500'>Save Changes</Button>
                  }
                  
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
