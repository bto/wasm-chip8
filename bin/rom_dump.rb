#!/usr/bin/env ruby

indent = "    "
i = 0;
ARGF.each_byte {|c|
  i += 1
  print indent if i % 8 == 1
  print "0x%02X, " % c
  print "\n" if i % 8 == 0
}
