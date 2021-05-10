## 钉钉配置
  + AgentId = 1024435904;
  + AppKey = 'dingjznhonq1zzp4ggww';
  + AppSecret = 'fhhI9cE-CeTbe5nmmHkmjR5qVVnovZpbe_nkF1RRK5DODvondRkme_OWnRI3jNk5';

## 钉钉userid获取方式
### personal_management表 
  + dd_userid字段
## 统计表
  + attendance_info
## 接口
  + ### 获取token
    https://ding-doc.dingtalk.com/document/app/obtain-orgapp-token
  + ### 获取报表列定义
    https://ding-doc.dingtalk.com/document/app/queries-the-enterprise-attendance-report-column
  + ### 获取报表列值
    https://ding-doc.dingtalk.com/document/app/obtains-the-column-values-of-the-smart-attendance-report

```
  {
	"errcode":0,
	"result":{
		"columns":[
			{
				"sub_type":0,
				"name":"下班1打卡结果",
				"alias":"1_off_duty_user_check_result",
				"expression_id":148503447,
				"id":148509447,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班1打卡时间",
				"alias":"1_off_duty_user_check_time",
				"expression_id":148503446,
				"id":148509446,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班1打卡结果",
				"alias":"1_on_duty_user_check_result",
				"expression_id":148503445,
				"id":148509445,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班1打卡时间",
				"alias":"1_on_duty_user_check_time",
				"expression_id":148503444,
				"id":148509444,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班2打卡结果",
				"alias":"2_off_duty_user_check_result",
				"expression_id":148503451,
				"id":148509451,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班2打卡时间",
				"alias":"2_off_duty_user_check_time",
				"expression_id":148503450,
				"id":148509450,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班2打卡结果",
				"alias":"2_on_duty_user_check_result",
				"expression_id":148503449,
				"id":148509449,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班2打卡时间",
				"alias":"2_on_duty_user_check_time",
				"expression_id":148503448,
				"id":148509448,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班3打卡结果",
				"alias":"3_off_duty_user_check_result",
				"expression_id":148503455,
				"id":148509455,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班3打卡时间",
				"alias":"3_off_duty_user_check_time",
				"expression_id":148503454,
				"id":148509454,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班3打卡结果",
				"alias":"3_on_duty_user_check_result",
				"expression_id":148503453,
				"id":148509453,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班3打卡时间",
				"alias":"3_on_duty_user_check_time",
				"expression_id":148503452,
				"id":148509452,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"旷工天数",
				"alias":"absenteeism_days",
				"expression_id":148503434,
				"id":148509434,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"旷工迟到次数",
				"alias":"absenteeism_late_times",
				"expression_id":148503429,
				"id":148509429,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"旷工迟到天数",
				"alias":"absenteeism_late_times",
				"expression_id":148503457,
				"id":148509457,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"关联的审批单",
				"alias":"attendance_approve",
				"expression_id":148503456,
				"id":148509456,
				"type":0,
				"status":0
			},
			{
				"sub_type":2,
				"name":"出勤班次",
				"alias":"attendance_class",
				"expression_id":148503421,
				"id":148509421,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"出勤天数",
				"alias":"attendance_days",
				"expression_id":148503422,
				"id":148509422,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"休息天数",
				"alias":"attendance_rest_days",
				"expression_id":148503423,
				"id":148509423,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"工作时长",
				"alias":"attendance_work_time",
				"expression_id":148503424,
				"id":148509424,
				"type":0,
				"status":0
			},
			{
				"sub_type":1,
				"name":"考勤结果",
				"alias":"attend_result",
				"expression_id":148503442,
				"id":148509442,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"出差时长",
				"alias":"business_trip_time",
				"expression_id":148503435,
				"id":148509435,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"迟到时长",
				"alias":"late_minute",
				"expression_id":148503426,
				"id":148509426,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"迟到次数",
				"alias":"late_times",
				"expression_id":148503425,
				"id":148509425,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"年假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"事假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"病假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"调休",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"产假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"陪产假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"婚假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"丧假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"哺乳假",
				"alias":"leave_",
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"早退时长",
				"alias":"leave_early_minute",
				"expression_id":148503431,
				"id":148509431,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"早退次数",
				"alias":"leave_early_times",
				"expression_id":148503430,
				"id":148509430,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"补卡次数",
				"alias":"making_up_lack_times",
				"expression_id":148503420,
				"id":148509420,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"下班缺卡次数",
				"alias":"off_work_lack_card_times",
				"expression_id":148503433,
				"id":148509433,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"上班缺卡次数",
				"alias":"on_work_lack_card_times",
				"expression_id":148503432,
				"id":148509432,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"外出时长",
				"alias":"out_time",
				"expression_id":148503436,
				"id":148509436,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"加班-审批单统计",
				"alias":"overtime_approve_count",
				"expression_id":148503438,
				"id":148509438,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"休息日加班",
				"alias":"overtime_休息日加班",
				"expression_id":148503440,
				"id":148509440,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"工作日加班",
				"alias":"overtime_工作日加班",
				"expression_id":148503439,
				"id":148509439,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"节假日加班",
				"alias":"overtime_节假日加班",
				"expression_id":148503441,
				"id":148509441,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"班次",
				"alias":"plan_detail",
				"expression_id":148503443,
				"id":148509443,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"严重迟到时长",
				"alias":"serious_late_minute",
				"expression_id":148503428,
				"id":148509428,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"严重迟到次数",
				"alias":"serious_late_times",
				"expression_id":148503427,
				"id":148509427,
				"type":0,
				"status":0
			},
			{
				"sub_type":0,
				"name":"应出勤天数",
				"alias":"should_attendance_days",
				"expression_id":148503419,
				"id":148509419,
				"type":0,
				"status":0
			}
		]
	},
	"request_id":"pod67ir5llhm"
}
```