// 1. 求解代数方程
// (10x + 5) x 2 = 110
// 等式成立 依然成立
// 给等式两端同时加上任意的一个实数
// 给等式两端同时减去任意的一个实数
// 给等式两端同时乘以任意的一个实数
// 给等式两端同时除以任意的一个实数

// 2. 三角函数
// Math.sin() Math.cos() Math.tan()
// 2-1. 角度和弧度 180度 = π 弧度
// 1 弧度 = (π / 180) x 度
// 1 度 = （180 / π）x 弧度
// 45 度 = 多少弧度？ === (Math.PI / 180) * 45

// 2-2. 正弦(sine)  余弦(cosine)  正切函数(tangent)
// 正弦 - sine : sin(θ)  = 对边 / 斜边
// 余弦 - cosine : cos(θ)  = 邻边 / 斜边
// 正切 - tangent : tan(θ)  = 对边 / 邻边

// 2-3. 向量运算
// 任何直角三角形的斜边，等于另外两边的平方根
const vectorMagnitude = Math.sqrt(
  Math.pow(vector.x, 2) + Math.pow(vector.y, 2)
);

// 2-3-1 单位向量 （unit vector）长度永远是 1
const vectorMagnitude = Math.sqrt(
  Math.pow(vector.x, 2) + Math.pow(vector.y, 2)
);
const unitVector = new Vector();
unitVector.x = vector.x / vectorMagnitude;
unitVector.y = vector.y / vectorMagnitude;
