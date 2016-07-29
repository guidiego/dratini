class Sum
    def initialize(a, b)
        @a = a
        @b = b
    end
    def execute()
        @a + @b 
    end
end

s = Sum.new(1, 2)
s.execute()