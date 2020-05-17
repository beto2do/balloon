import Color from './color';

class Balloon {

    constructor(ctx, centerX, centerY, radius, color) {
        this.KAPPA = (4 * (Math.sqrt(2) - 1))/3;
        this.WIDTH_FACTOR = 0.0333;
        this.HEIGHT_FACTOR = 0.4;
        this.TIE_WIDTH_FACTOR = 0.12;
        this.TIE_HEIGHT_FACTOR = 0.10;
        this.TIE_CURVE_FACTOR = 0.13;
        this.GRADIENT_FACTOR = 0.3;
        this.GRADIENT_CIRCLE_RADIUS = 3;
        
        this.ctx = ctx;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.baseColor = new Color(color);
        this.darkColor = this.baseColor.darken(30);
        this.lightColor = this.baseColor.lighten(30);
    }

    draw() {

        let handleLength = this.KAPPA * this.radius;
        let widthDiff = (this.radius * this.WIDTH_FACTOR);
        let heightDiff = (this.radius * this.HEIGHT_FACTOR);
	    let balloonBottomY = this.centerY + this.radius + heightDiff;
	
	    this.ctx.beginPath();

    	// Top Left Curve
	
        let topLeftCurveStartX = this.centerX - this.radius;
        let topLeftCurveStartY = this.centerY;
        let topLeftCurveEndX = this.centerX;
        let topLeftCurveEndY = this.centerY - this.radius;
	
        this.ctx.moveTo(topLeftCurveStartX, topLeftCurveStartY);
        this.ctx.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
                                topLeftCurveEndX - handleLength, topLeftCurveEndY,
                                topLeftCurveEndX, topLeftCurveEndY);
							
	    // Top Right Curve
	
        let topRightCurveStartX = this.centerX;
        let topRightCurveStartY = this.centerY - this.radius;
        let topRightCurveEndX = this.centerX + this.radius;
        let topRightCurveEndY = this.centerY;
	
        this.ctx.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
                                topRightCurveEndX, topRightCurveEndY - handleLength,
                                topRightCurveEndX, topRightCurveEndY);
										
	    // Bottom Right Curve
	
        let bottomRightCurveStartX = this.centerX + this.radius;
        let bottomRightCurveStartY = this.centerY;
        
        let bottomRightCurveEndX = this.centerX;
        let bottomRightCurveEndY = balloonBottomY;
	
        this.ctx.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
                                bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
                                bottomRightCurveEndX, bottomRightCurveEndY);							
	
	    // Bottom Left Curve
	
        let bottomLeftCurveStartX = this.centerX;
        let bottomLeftCurveStartY = balloonBottomY;
        let bottomLeftCurveEndX = this.centerX - this.radius;
        let bottomLeftCurveEndY = this.centerY;
	
        this.ctx.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
                                bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
                                bottomLeftCurveEndX, bottomLeftCurveEndY);
	
	    // Create balloon gradient
	
	    let gradientOffset = (this.radius/3);
	
        let balloonGradient =
            this.ctx.createRadialGradient(this.centerX + gradientOffset, this.centerY - gradientOffset,
                                            this.GRADIENT_CIRCLE_RADIUS,
                                            this.centerX, this.centerY, this.radius + heightDiff);
        balloonGradient.addColorStop(0, this.lightColor);
        balloonGradient.addColorStop(0.7, this.darkColor);
	
        this.ctx.fillStyle = balloonGradient;
        this.ctx.fill();
	
        // End balloon path
        
        // Create balloon tie
	
        let halfTieWidth = (this.radius * this.TIE_WIDTH_FACTOR)/2;
        let tieHeight = (this.radius * this.TIE_HEIGHT_FACTOR);
        let tieCurveHeight = (this.radius * this.TIE_CURVE_FACTOR);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 1, balloonBottomY);
        this.ctx.lineTo(this.centerX - halfTieWidth, balloonBottomY + tieHeight);
        this.ctx.quadraticCurveTo(this.centerX, balloonBottomY + tieCurveHeight,
                                    this.centerX + halfTieWidth, balloonBottomY + tieHeight);
        this.ctx.lineTo(this.centerX + 1, balloonBottomY);
        this.ctx.fill();
    }
}

export default Balloon;