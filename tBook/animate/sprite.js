var Sprite = function (name, painter, behaviors) {
  this.name = name || undefined;
  this.painter = painter || undefined;
  this.top = 0;
  this.left = 0;
  this.width = 10;
  this.height = 10;
  this.velocityX = 0;
  this.velocityY = 0;
  this.visiable = true;
  this.animating = false;
  this.behaviors = behaviors || {};
  return this;
};

Sprite.prototype = {
  paint: function (context) {
    if (this.painter !== undefined && this.visiable) {
      this.painter.paint(this, context);
    }
  },
  update: function (context, time) {
    for (let i = 0; i < this.behaviors.length; i++) {
      this.behaviorsk[i].execute(this, context, time);
    }
  },
};

var ImagePainter = function (src) {
  this.image = new Image();
  this.image.src = src;
};

ImagePainter.prototype = {
  paint: function (sprite, context) {
    if (this.image.complete) {
      context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height);
    }
  },
};
