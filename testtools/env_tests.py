import os
import unittest
import tempfile
class EnviromentTest(unittest.TestCase):
    "Testcase that makeshure that the env is up"
    def reportProgres(self):
      """Should be overloaded by Testresult class"""
    
    def stop(self):
      """Should be overloaded by Testresult class"""

    def runTest(self):
      """The actual test goes here."""
      if os.system(
          "js --help > %s" % 
          os.path.join(
            tempfile.gettempdir(),
            tempfile.gettempprefix()
            )
          ):
          self.stop()
          raise RuntimeError("""Can't find the "js" command.""")
      self.reportProgres()
      if not os.path.exists("py-builtins.js"):
          self.stop()
          raise RuntimeError("""Can't find the "py-builtins.js" command.""")
      self.reportProgres()

    def __str__(self):
        return 'Looking for "js" and "py-builtins" [2]: '


