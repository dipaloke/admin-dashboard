import React from "react";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="avatar" fill />
        </div>
        Iphone
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Title</label>
          <input type="text" name="title" placeholder="Name the product" />
          <label>Price</label>
          <input type="number" name="price" placeholder="$" />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="20" />
          <label>Color</label>
          <input type="text" name="color" placeholder="red" />
          <label>Size</label>
          <textarea type="text" name="size" placeholder="size" />
          <label>Category</label>
          <select name="cat" id="cat">
            <option value="general">Choose a Category</option>
            <option value="kitchen">Kitchen</option>
            <option value="Phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>  
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
