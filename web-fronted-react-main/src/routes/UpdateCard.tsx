import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CardType } from "../@types/types";
import axios from "axios";
import _ from "lodash";


const UpdateCard = () => {
const { id } = useParams();
const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`;
const {
register,
control,
handleSubmit,
formState: { errors },
} = useForm<CardType>({
defaultValues: async () => {
const res = await axios.get(url);
const data = res.data;
return data;
},
});

const onUpdateCard = async (card: CardType) => {
try {
await axios.put(url, _.omit(card, ['image._id', 'address._id','_id','likes','createdAt','__v']),{
    headers: {
        "x-auth-token": localStorage.getItem("token"), // הוספת כותרת 'x-auth-token' עם האסימון השמור בלוקל סטורג'
    },
});
alert("Card updated");
} catch (e) {
console.log(e);
}
};

return (

<form  onSubmit={handleSubmit(onUpdateCard)} className="flex flex-col  items-center     justify-between mx-10  space-y-2 my-5 ">


<section>
<input
placeholder="Dcity"
type="text"
{...register("address.city")}
    />
</section>


<section>
<input
placeholder="Address Country"
type="text"
{...register("address.country")}
/>
</section>

<section>
<input
placeholder="Address House Number"
type="text"
{...register("address.houseNumber")}
/>
</section>

<section>
<input
placeholder="Address State"
type="text"
{...register("address.state")}
/>
</section>

<section>
<input
placeholder="Address House street"
type="text"
{...register("address.street")}
/>
</section>

<section>
<input
placeholder="Address Zip"
type="number"
{...register("address.zip")}
/>
</section>

<section>
<input
placeholder=" Address _id"
type="text"
{...register("address._id")}
/>
</section>

<section>
<input
placeholder="biz number"
type="text"
{...register("bizNumber")}
/>
</section>

<section>
<input
placeholder="createdAt"
type="text"
{...register("createdAt")}
/>
</section>

<section>
<input
placeholder="description"
type="text"
{...register("description")}
/>
</section>

<>
<input
placeholder="Email"
type="text"
{...register("email", {
required: "This field is mandatory",
minLength: { value: 2, message: "Too short" },
maxLength: { value: 255, message: "Too long" },
})}
/>
{errors.email && <p className="text-red-500">{errors.email?.message}</p>}
</>




<section>
<input
placeholder="image alt"
type="number"
{...register("image.alt")}
/>
</section>

<section>
<input
placeholder="image url"
type="text"
{...register("image.url")}
/>
</section>

<section>
<input
placeholder="image _id"
{...register("image._id")}

/>
</section>
<section>
<input
placeholder="phone"
type="text"
{...register("phone")}
/>
</section>

<section>
<input
placeholder="subtitle"
type="text"
{...register("subtitle")}
/>
</section>



<section>
<input
placeholder="title"
type="text"
{...register("title")} />
</section>

<section>
<input
placeholder="user _id"
type="text"
{...register("user_id")}
/>
</section>
<section>
<input
placeholder="web"
type="text"
{...register("web")}
/>
</section>
<section>
<input
placeholder="website"
type="text"
{...register("web")}
/>
</section>
<section>
<input
placeholder="__v"
type="text"
{...register("__v")}
/>
</section>
<section>
<input
placeholder="_id"
type="text"
{...register("_id")}
/>
</section>


{/* Add more sections for other fields */}

<button type="submit" className="rounded-lg bg-blue-500 px-4 py-2 text-white ">Update</button>
</form>
);
};

export default UpdateCard;



