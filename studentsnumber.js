const fs = require('fs');
const csv =require('csv-parser');
const {MongoClient} = require('mongodb');

//MongoDB 連接設定
const uri ="mongodb://localhost:27017";
const dbName = "409820379";
const collectionName ="studentslist";

(async () => {
    const client =new MongoClient(uri);

    try {
        // 連接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");
    
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const aggregateResult = await collection.aggregate([
            { $group: { _id: "$院系", student_count: { $sum:1 } } },
            { $sort: { student_count: -1 } }
        ]).toArray();
        
        console.log(aggregateResult);
        
    
       
    } catch (error) {
        console.error("發生錯誤：", error);
    }finally{
        //關閉連結
        await client.close();
        console.log("已斷開 MongoDB 連接");
    }
})();