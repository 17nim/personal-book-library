# Reflection

สวัสดีครับ ศิรัสพลครับ 
ในความคิดเห็นของผม ส่วนที่ยากที่สุดคือการเชื่อม Backend, Database และ Frontend ให้ทำงานร่วมกันได้อย่างถูกต้อง  
ไม่ว่าจะเป็นการทำความเข้าใจทั้ง database schema, API และรูปแบบข้อมูลที่ส่งระหว่าง Frontend กับ Backend
ระหว่างทำก็เจอปัญหาเรื่อง database connection และ query parameters ที่บางครั้งเราคิดว่า backend ยิงข้อมูลที่เป็น undefined ไป แต่ database กลับได้รับเป็น empty string ก็ทำเอาปวดหัวอยู่เหมือนกันครับ แต่ก็ทำให้เราได้ฝึก debug จาก error ที่เกิดขึ้น และการแยก Controller, Service และ Repository ก็ช่วยให้แต่ละส่วนรับผิดชอบหน้าที่ของตัวเอง ทำให้การ debug ไม่ยุ่งยากจนเกินไปครับ