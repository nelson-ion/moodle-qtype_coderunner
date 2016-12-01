<?php
// This file is part of CodeRunner - http://coderunner.org.nz/
//
// CodeRunner is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// CodeRunner is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with CodeRunner.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Configuration settings declaration information for the CodeRunner question type.
 *
 * @package    qtype
 * @subpackage coderunner
 * @copyright  2014 Richard Lobb, The University of Canterbury.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$links = array(
    get_string('bulkquestiontester', 'qtype_coderunner',
            array('link' => (string) new moodle_url('/question/type/coderunner/bulktestindex.php')))
);

$settings->add(new admin_setting_heading('supportscripts',
        get_string('supportscripts', 'qtype_coderunner'), '* ' . implode("\n* ", $links)));

$settings->add(new admin_setting_heading('codeRunnersettings',
        get_string('coderunnersettings', 'qtype_coderunner'), ''));

$sandboxes = qtype_coderunner_sandbox::available_sandboxes();
foreach ($sandboxes as $sandbox => $classname) {
    $settings->add(new admin_setting_configcheckbox(
        "qtype_coderunner/{$sandbox}_enabled",
        get_string('enable', 'qtype_coderunner') . ' ' .$sandbox,
        get_string('enable_sandbox_desc', 'qtype_coderunner'),
        $sandbox === 'jobesandbox')  // Only jobesandbox is enabled by default.
    );
}

$settings->add(new admin_setting_configtext(
        "qtype_coderunner/jobe_host",
        get_string('jobe_host', 'qtype_coderunner'),
        get_string('jobe_host_desc', 'qtype_coderunner'),
        'jobe2.cosc.canterbury.ac.nz'));

$settings->add(new admin_setting_configtext(
        "qtype_coderunner/jobe_apikey",
        get_string('jobe_apikey', 'qtype_coderunner'),
        get_string('jobe_apikey_desc', 'qtype_coderunner'),
        '2AAA7A5415B4A9B394B54BF1D2E9D'
        ));

$settings->add(new admin_setting_configtext(
        "qtype_coderunner/ideone_user",
        get_string('ideone_user', 'qtype_coderunner'),
        get_string('ideone_user_desc', 'qtype_coderunner'),
        ''));

$settings->add(new admin_setting_configtext(
        "qtype_coderunner/ideone_password",
        get_string('ideone_pass', 'qtype_coderunner'),
        get_string('ideone_pass_desc', 'qtype_coderunner'),
        ''));

$settings->add(new admin_setting_configcheckbox(
        "qtype_coderunner/diff_check_enabled",
        get_string('enable_diff_check', 'qtype_coderunner'),
        get_string('enable_diff_check_desc', 'qtype_coderunner'),
        false));