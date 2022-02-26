import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Breed from './models/Breed.js'

const seedBreeds = async() => {
    try{
        await connectDB(process.env.MONGO_URL)
        await Breed.deleteMany()
        const url = "https://api.thedogapi.com/v1/breeds"
        const response = await fetch(url)
        const breedData = await response.json()
        // console÷.log(json)
        for (let i = 0; i < breedData.length; i++) {
            await Breed.create({
                name: breedData[i].name,
                temperament: breedData[i].temperament,
                lifeSpan: breedData[i].life_span,
                weight: breedData[i].weight.imperial,
                height: breedData[i].height.imperial,
                breedGroup: breedData[i].breed_group,
                bredFor: breedData[i].bred_for || "Unknown",
                imageUrl: breedData[i].image.url,
            })
        }
        console.log("Seeding Breeds successful")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

seedBreeds()
