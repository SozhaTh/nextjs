import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

cloudinary.config({ 
  cloud_name: 'dceug2rky', 
  api_key: '712838892986269', 
  api_secret: 'gq5GUW325F42V5JeFAjbiknmLMQ' 
});
export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM product");
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await processImage(image);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }

            resolve(result);
          }
        )
        .end(buffer);
    });

    const result = await conn.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      price: data.get("price"),
      tallas: data.get("tallas"),
      color: data.get("color"),
      material: data.get("material"),
      image: res.secure_url,
    });

    return NextResponse.json({
      name: data.get("name"),
      price: data.get("price"),
      tallas: data.get("tallas"),
      color: data.get("color"),
      material: data.get("material"),
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
