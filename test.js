const regex = /^\d{1,50},+\n(?<title>.+(?<score>\d).+)\n(?<ops>(?<op>,+\n[A-Z]、\s*.+\n)+)/gum;
const str = `2020年大众品牌车联网激活第二次考试,,,,,,
一、单选（共35道试题，共70分）,,,,,,
1,,,,,,
在DMS绑车过程中，需要输入车辆___信息？(,2分,),,,,
,,,,,,
A、 发动机号信息,,,,,,
,,,,,,
B、 车牌号信息,,,,,,
,,,,,,
C、 底盘号信息,,,,,,
,,,,,,
A  B  C,,,,,,
,,,,,,
标准答案：C,,,,,,
,,,,,,
您的得分：2 分,,,,,,
2,,,,,,
个人绑车，是在【车联网管理】模块下()功能,内,进,行操作,(2,分),
,,,,,,
A、 在【MOSC车查询】功能内选择【展车】激,活,,,,,
,,,,,,
B、 在【MOSC服务认证】功能内选择【个人】,激,活,,,,
,,,,,,
C、 在【MOSC车查询】功能内选择【个人】激,活,,,,,
,,,,,,
A  B  C,,,,,,
,,,,,,
标准答案：B,,,,,,
,,,,,,
您的得分：2 分,,,,,,`;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}
