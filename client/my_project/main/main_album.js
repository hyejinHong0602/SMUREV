FlowRouter.template('/main_album', 'main_album');

Template.main_album.onRendered(function() {

})

Template.main_album.helpers({
    boards: function() {
        var area = FlowRouter.getParam('area');
        var tag = FlowRouter.getParam('tag');
        var order = FlowRouter.getParam('order')
        if(area=='전체'&&tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({}, {sort: {createdAt: -1}});
            }
        }else if(area=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_tag': tag}, {sort: {createdAt: -1}});
            }

        }else if(tag=='전체'){
            if(order=='rec'){
                return DB_REVS.findAll({'posting_area': area}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_area': area}, {sort: {createdAt: -1}});
            }
        }else{
            if(order=='rec'){
                return DB_REVS.findAll({'posting_area': area, 'posting_tag': tag}, {sort: {recommend: -1}});
            }else{
                return DB_REVS.findAll({'posting_area': area, 'posting_tag': tag}, {sort: {createdAt: -1}});
            }
        }

    },
    YMD: function() {
        return this.createdAt.toStringYMD();
    },
    HMS: function() {
        return this.createdAt.toStringHMS();
    }

});

Template.main_album.helpers({

    area : function(){
        var area = FlowRouter.getParam('area');
        if(!area){
            return '전체';
        }
        return area;
    },
    tag : function(){
        var tag = FlowRouter.getParam('tag');
        if(!tag){
            return '전체';
        }
        return tag;
    },
    order : function(){
        var order = FlowRouter.getParam('order');
        if(!order){
            return 'new';
        }
        return order;
    },
    link: function() {
        // 저장 된 이미지 링크를 반환
        return DB_FILES.findOne({_id: this.file_id}).link()

    },
    rec_img: function () {
        var post_id = this.id
        console.log(post_id);
        var user_id = Meteor.user()._id;

        if(!DB_RECOMMEND.findOne({post_id : post_id, user_id : user_id})){
            return 'rec_normal.png';
        }else{
            return 'rec_over.png';
        }
    }
});

Template.main_album.events({
})
