// 1. 引用mockjs
import Mock  from "mockjs"; 
import latiao from '@/assets/images/辣条.png'
import shupian from '@/assets/images/薯片.png'
import kele from '@/assets/images/可乐.png'
import yezhi from '@/assets/images/椰汁.png'
import lamian from '@/assets/images/拉面.png'
import guodong from '@/assets/images/果冻.png'
// 2. 基本用法 Mock.mock(url, type, data)
Mock.mock("/test","post",{
    code: 200,
    message: '成功',
    data: {
        list:[
            {name:'zs', age:18},
            {name:'ls', age:26}
        ]
    }
})


// 模拟登录接口
Mock.mock("/login", "post", (options) => {
    const { username, password} = JSON.parse(options.body);
    // 在实际情况下，这里可以进行用户名和密码的验证逻辑
    if (username === "admin" && password === "123") {
      return {
        code: 200,
        message: '登录成功',
        token: 'xxxxxxxxxxxx',  // 假设这里是登录成功后返回的 token
        data:'管理员',
      };
    } else {
      return {
        code: 401,
        message: '用户名或密码错误'
      };
    }
  });

// 商品信息

Mock.mock("/product","post",{
  code: 200,
  message: '数据获取成功',
  data: [
        { 
          id: 1, 
          name: '香辣小龙虾味辣条', 
          category: '辣条类', 
          price: '0.5元', 
          quantity:1,
          image: latiao,
          description: '精选优质玉米粉和秘制香料，口感酥脆，香辣可口，是休闲时光的最佳选择。',
          benefits: '富含蛋白质和纤维，不含反式脂肪，适合各年龄段人群。',
          usage: '可直接食用，或者搭配啤酒、饮料一起享用。',
          origin: '原产地：中国湖南省'
        },
        { 
          id: 2, 
          name: '脆香番薯薯片', 
          category: '薯片类', 
          price: '1.0元', 
          quantity:2,
          image: shupian,
          description: '采用新鲜番薯为原料，经过低温烘烤而成，保留了番薯的天然甜味和营养成分，口感脆香，是健康零食的首选。',
          benefits: '富含维生素A和膳食纤维，有助于增强免疫力和促进消化。',
          usage: '适合作为下午茶或夜宵，也可搭配牛奶或果汁享用。',
          origin: '原产地：中国福建省'
        },
        { 
          id: 3, 
          name: '红烧牛肉面', 
          category: '泡面类', 
          price: '2.5元', 
          quantity:1,

          image: lamian,
          description: '采用传统手工制作工艺，面条筋道有嚼劲，牛肉浓郁鲜美，汤汁醇厚，是办公室一族和学生党的必备选择。',
          benefits: '富含蛋白质和碳水化合物，提供长效能量。',
          usage: '将面条放入沸水中煮熟后，加入调料包和配菜，即可食用。',
          origin: '原产地：中国山东省'
        },
        { 
          id: 4, 
          name: '椰子饮料', 
          category: '饮料类', 
          price: '3.0元', 
          quantity:1,
          image: yezhi,
          description: '选用新鲜椰子汁和天然矿泉水，口感清爽，香甜可口，是炎热夏日的最佳解暑选择。',
          benefits: '无添加防腐剂和人工色素，健康天然。',
          usage: '冷藏后饮用更佳，适合搭配烧烤或海鲜餐食。',
          origin: '原产地：泰国'
        },
        { 
          id: 5, 
          name: '草莓味果冻', 
          category: '果冻类', 
          price: '1.5元', 
          quantity:1,
          image: guodong,
          description: '选用新鲜草莓和纯净水果汁为原料，口感Q弹，酸甜适中，是儿童和年轻人的最爱。',
          benefits: '富含维生素C和抗氧化成分，有助于美容养颜。',
          usage: '可直接食用，也可搭配酸奶或冰淇淋享用。',
          origin: '原产地：中国广东省'
        },
        { 
          id: 6, 
          name: '冰镇可乐', 
          category: '饮料类', 
          price: '2.0元', 
          quantity:1,
          image: kele,
          description: '经典的可乐饮料，经过冰镇后，口感更加清爽刺激，是聚会和休闲时光的最佳搭配。',
          benefits: '含有咖啡因，可以提神醒脑。',
          usage: '适合与炸鸡、披萨等快餐一起享用。',
          origin: '原产地：美国'
        }
      ]
})