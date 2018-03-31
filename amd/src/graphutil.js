/***********************************************************************
 *
 * Utility functions/data/constants for the ui_graph module.
 *
 ***********************************************************************/

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more util.details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.


define(function() {

    function Util() {
        // Constructor for the Util class.

        this.greekLetterNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon',
                                'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda',
                                'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma',
                                'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega' ];
    }

    Util.prototype.convertLatexShortcuts = function(text) {
        // html greek characters
        for(var i = 0; i < this.greekLetterNames.length; i++) {
            var name = this.greekLetterNames[i];
            text = text.replace(new RegExp('\\\\' + name, 'g'), String.fromCharCode(913 + i + (i > 16)));
            text = text.replace(new RegExp('\\\\' + name.toLowerCase(), 'g'), String.fromCharCode(945 + i + (i > 16)));
        }

        // subscripts
        for(var i = 0; i < 10; i++) {
            text = text.replace(new RegExp('_' + i, 'g'), String.fromCharCode(8320 + i));
        }
        text = text.replace(new RegExp('_a', 'g'), String.fromCharCode(8336));
        return text;
    };

    Util.prototype.drawArrow = function(c, x, y, angle) {
        // Draw an arrow head on the graphics context c at (x, y) with given angle

        var dx = Math.cos(angle);
        var dy = Math.sin(angle);
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
        c.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
        c.fill();
    };

    Util.prototype.det = function(a, b, c, d, e, f, g, h, i) {
        // Determinant of given matrix elements
        return a * e * i + b * f * g + c * d * h - a * f * h - b * d * i - c * e * g;
    };


    Util.prototype.circleFromThreePoints = function(x1, y1, x2, y2, x3, y3) {
        // Return {x, y, radius} of circle through (x1, y1), (x2, y2), (x3, y3)
        var a = this.det(x1, y1, 1, x2, y2, 1, x3, y3, 1);
        var bx = -this.det(x1 * x1 + y1 * y1, y1, 1, x2 * x2 + y2 * y2, y2, 1, x3 * x3 + y3 * y3, y3, 1);
        var by = this.det(x1 * x1 + y1 * y1, x1, 1, x2 * x2 + y2 * y2, x2, 1, x3 * x3 + y3 * y3, x3, 1);
        var c = -this.det(x1 * x1 + y1 * y1, x1, y1, x2 * x2 + y2 * y2, x2, y2, x3 * x3 + y3 * y3, x3, y3);
        return {
            'x': -bx / (2 * a),
            'y': -by / (2 * a),
            'radius': Math.sqrt(bx * bx + by * by - 4 * a * c) / (2 * Math.abs(a))
        };
    };

    Util.prototype.isInside = function(pos, rect) {
        // True iff given point pos is inside rectangle.
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    };


    Util.prototype.crossBrowserKey = function(e) {
        // Return which key was pressed, given the event, in a browser-independent way
        e = e || window.event;
        return e.which || e.keyCode;
    };


    Util.prototype.crossBrowserElementPos = function(e) {
        // Return the {x, y} location of the element in which event e occurred
        e = e || window.event;
        var obj = e.target || e.srcElement;
        var x = 0, y = 0;
        while(obj.offsetParent) {
            x += obj.offsetLeft;
            y += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return { 'x': x, 'y': y };
    };


    Util.prototype.crossBrowserMousePos = function(e) {
        // Return the {x, y} page coords (?) of the mouse position associated with event e
        e = e || window.event;
        return {
            'x': e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            'y': e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        };
    };


    Util.prototype.crossBrowserRelativeMousePos = function(e) {
        // Return the {x, y} location relative to the element within which the
        // event occurred of the mouse position associated with event e.
        var element = this.crossBrowserElementPos(e);
        var mouse = this.crossBrowserMousePos(e);
        return {
            'x': mouse.x - element.x,
            'y': mouse.y - element.y
        };
    };

    return new Util();
});