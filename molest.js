var old_x = 0;
var old_y = 0;//用来保存旧的坐标的变量
var molestLW = {
	keys: new Array(),
	init: function() {
		this.keys['38'] = 5;//up
		this.keys['40'] = 1;//down
		this.keys['39'] = 7;//right
		this.keys['37'] = 3;//left
		
		this.dir = new Array();
		this.dir = ['c', 's', 'sv', 'v', 'nv', 'n', 'ne', 'e', 'se', 's', 'c1', 'cc'];
		//绑定事件
		var obj = this;
		$(window).keydown(function(ev){
				//alert(obj.keys[ev.keyCode] + '');
				if(obj.keys[ev.keyCode]) {
					obj.changeOneFace($('.eye'), obj.keys[ev.keyCode]);
					return false;//阻止冒泡，否则document会向下移动
				}
			}
		);
		
	},
	changeOneFace: function(elem, direction) {//改变一个人的表情,其实就是改变他的class
		elem.attr('class', 'eye eye_' + this.dir[direction]);
	},
	changeAllFace: function(direction) {//改变一个人的表情
		$('.eye').attr('class', 'eye eye_' + this.dir[direction]);
	},
	setupMouse: function() {//建立鼠标移动事件
		var obj = this;
        $(document).mousemove(function(e) {
            m_x = e.pageX;
            m_y = e.pageY;
			console.log(e.pageX + ', ' + e.pageY);
            r_x = m_x - old_x;
            r_y = m_y - old_y;
            dist = Math.sqrt(r_x * r_x + r_y * r_y);
            if (dist > 15)//如果移动的距离大于15
            {
                old_x = m_x;
                old_y = m_y;
                $('.eye').each(function() {
                    obj.redraw($(this), m_x, m_y);
                });
            }
        });
    },
	redraw: function(element, mx, my) {//重画表情算法,看不懂?正常
        pos = element.offset();
        half_width = element.width() / 2;
        half_height = element.height() / 2;
        i_x = pos.left + (half_width);
        i_y = pos.top + (half_height)
        rel_x = mx - i_x;
        rel_y = my - i_y;
        dist = Math.sqrt(rel_x * rel_x + rel_y * rel_y);
        if (dist > half_width || dist > half_height)
        {
            angle = Math.acos( - rel_y / dist) * 57.3248;
            sign = (rel_x > 0) ? 1: -1;
            angle = angle * sign;
            p = Math.round(angle / 45) + 5;
            this.changeOneFace(element, p);
        }
        else
        {

            this.changeOneFace(element, 11);//正面照
        }
    }
};

$(document).ready(function() {
	molestLW.init();
	//绑定点击事件
	$('.eye').bind('click', function(ev) {
		molestLW.changeAllFace(1);
		molestLW.changeOneFace($(this), 10);//变成鸡冻表情
	});
	$('.eye').mouseover(function() {
        molestLW.changeOneFace($(this), 11);//正面照
    });
	molestLW.setupMouse();
});
